const express = require('express')
const User = require('../models/user');

const ValidateRegister = require("../validation/Register")
const ValidateLogin = require("../validation/Login")
const router = express.Router() ;
const multer = require('multer') ;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const passport = require('passport');
const { ROLES, isRole } = require('../security/roleMiddleWare');
require('dotenv').config()


fileNameInDB = ''

const myStorage = multer.diskStorage({
    destination : './uploads/user' ,
    filename : (req , file , redirect)=>{
        let date = Date.now()
        // img/👀png👀
        let fileName = date + "." + file.mimetype.split('/')[1] ;
        redirect(null , fileName) ;
        fileNameInDB = fileName
    }
})

//Middleware upload image :
const upload = multer({storage : myStorage})


router.post('/addUser' , upload.any('image') , async (req , res)=>{ 
    try{
       data = req.body 
        // Create a new user object
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(data.password, salt);
        const user = new User({
            ...data,
            password: hashedPassword,
        });
       user.image = fileNameInDB ;  // image : step 2
       savedUser = await user.save()
       fileNameInDB = "" // image : step 3

    //    let fileNameInDB = "";
    //    if (req.files && req.files.length > 0) {
    //        fileNameInDB = req.files[0].filename; // Assuming the uploaded file is the first file
    //     }

       res.status(200).send(savedUser)
       console.log("User Added Success 🧑🏼‍💼") 

    }
    catch(err){
        res.status(400).send(err)
    }
})


router.post('/register', async (req, res) => {
    const { errors , isValid } = ValidateRegister(req.body)
    try {
        if(!isValid){
            res.status(404).json(errors)
        }else{
            const { name, email, password } = req.body;
             // Check if the email is already registered
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                errors.email = "Email is already registered."
                return res.status(400).json(errors);
            }

          // Create a new user object
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const user = new User({
                name,
                email,
                password: hashedPassword, // Store the hashed password
                role : 'EMPLOYE', // Default role is 'employe'
            });

            // Save the user to the database
            const savedUser = await user.save();
            res.status(201).json({ message: 'User registered successfully', user: savedUser });

        }

      
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});


router.post('/login' , async(req , res)=>{
    const {errors , isValid} = ValidateLogin(req.body)

    try{
        if(!isValid){
            return res.status(404).json(errors)
        }else{
            data = req.body ;
            user = await User.findOne({email : data.email})

            if(!user){
                res.status(404).send(" not found user")
            }else{
                validPassword = bcrypt.compareSync(data.password , user.password) //True or False
        
                if(!validPassword){
                    res.send('password invalid !')
                }else{
                    payload = {
                        _id : user._id ,
                        email : user.email ,
                        name : user.name ,
                        role : user.role ,
                    };

                   const token = jwt.sign( payload , process.env.PRIVATE_KEY , {expiresIn : '5h'} );
        
                    res.status(200).json({ 
                        message : 'success' ,
                        token : "Bearer " + token 
                    })
                }
            }
        }

    }catch (error){
        res.status(404).json(error.message)
    }
    
})

// gestion role route
// router.get('/user', passport.authenticate('jwt', { session: false }), isRole(ROLES.EMPLOYE) , (req, res) => {
//     res.send(req.user)
// });
// router.get('/admin', passport.authenticate('jwt', { session: false }), isRole(ROLES.ADMIN), (req, res) => {
//     res.send(req.user)
// });


/* add profile */
// router.post('/addProfiles', passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.send(req.user)
// });

// router.get('/getbyid/:id', async (req, res) => {
//     try {
//         const myId = req.params.id;
//         const userdata = await User.findOne({ _id: myId });
//         if (!userdata) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(userdata);
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching user', error: err.message });
//     }
// });


/* get all profiles */
router.get('/profiles' , passport.authenticate('jwt', { session: false }) , isRole(ROLES.ADMIN) , async(req , res)=>{
    try{
        users = await User.find();
        res.send(users) ;
    }
    catch(err){
        res.send(err) ;
    }
} )

/* get 1 profile */
router.get('/singleProfile' , passport.authenticate('jwt', { session: false }) , async(req , res)=>{
    try{
        const userById = await User.findOne({_id : req.user.id})
        res.status(200).json(userById)
    }
    catch(err){
        res.status(400).send(err)
    }
} )


// Update Profile (Add Image and Phone)
// router.put('/updateProfile', 
//     passport.authenticate('jwt', { session: false }), 
//     upload.single('image'), 
//     async (req, res) => {
//       try {
//         const userId = req.user._id; // Get user ID from the logged-in user
//         const updatedData = req.body;
  
//         if (req.file) {
//           updatedData.image = fileNameInDB; // Add the uploaded image filename
//           fileNameInDB = ''; // Reset fileNameInDB after saving
//         }
  
//         const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
  
//         res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
//       } catch (err) {
//         res.status(500).json({ message: 'Error updating profile', error: err.message });
//       }
//     }
//   );


router.put('/updateProfile/:id', 
    passport.authenticate('jwt', { session: false }), 
    upload.single('image'), 
    async (req, res) => {
      try {
        const userId = req.params.id; // Get user ID from the URL parameter
        const updatedData = req.body;

        // If an image is uploaded, add it to the updated data
        if (req.file) {
          updatedData.image = req.file.filename; // Use the filename from multer
        }

        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
      } catch (err) {
        res.status(500).json({ message: 'Error updating profile', error: err.message });
      }
    }
);


/* delete profile */
router.delete('/deleteProfile/:id' , passport.authenticate('jwt', { session: false }) , isRole(ROLES.ADMIN) , async(req , res)=>{

    try{
        id = req.params.id ;
        userDeleted = await User.findOneAndDelete({_id : id})
        res.status(200).send(userDeleted);  
        console.log("User deleted 🚮")  
    }
    catch(err){
        res.send(err)
    }

})




module.exports = router ;