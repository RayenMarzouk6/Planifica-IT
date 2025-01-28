import { Box } from '@mui/material'
import { ResponsiveLine } from '@nivo/line'

const LineGraphe = () => {
   const data = [
        {
          "id": "japan",
          "color": "hsl(295, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 3
            },
            {
              "x": "helicopter",
              "y": 31
            },
            {
              "x": "boat",
              "y": 249
            },
            {
              "x": "train",
              "y": 172
            },
            {
              "x": "subway",
              "y": 18
            },
            {
              "x": "bus",
              "y": 188
            },
            {
              "x": "car",
              "y": 240
            },
            {
              "x": "moto",
              "y": 58
            },
            {
              "x": "bicycle",
              "y": 117
            },
            {
              "x": "horse",
              "y": 108
            },
            {
              "x": "skateboard",
              "y": 75
            },
            {
              "x": "others",
              "y": 230
            }
          ]
        },
        {
          "id": "france",
          "color": "hsl(200, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 256
            },
            {
              "x": "helicopter",
              "y": 293
            },
            {
              "x": "boat",
              "y": 101
            },
            {
              "x": "train",
              "y": 139
            },
            {
              "x": "subway",
              "y": 239
            },
            {
              "x": "bus",
              "y": 45
            },
            {
              "x": "car",
              "y": 118
            },
            {
              "x": "moto",
              "y": 94
            },
            {
              "x": "bicycle",
              "y": 297
            },
            {
              "x": "horse",
              "y": 299
            },
            {
              "x": "skateboard",
              "y": 75
            },
            {
              "x": "others",
              "y": 76
            }
          ]
        },
        {
          "id": "us",
          "color": "hsl(260, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 285
            },
            {
              "x": "helicopter",
              "y": 1
            },
            {
              "x": "boat",
              "y": 38
            },
            {
              "x": "train",
              "y": 151
            },
            {
              "x": "subway",
              "y": 128
            },
            {
              "x": "bus",
              "y": 185
            },
            {
              "x": "car",
              "y": 248
            },
            {
              "x": "moto",
              "y": 140
            },
            {
              "x": "bicycle",
              "y": 210
            },
            {
              "x": "horse",
              "y": 181
            },
            {
              "x": "skateboard",
              "y": 254
            },
            {
              "x": "others",
              "y": 26
            }
          ]
        },
        {
          "id": "germany",
          "color": "hsl(353, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 273
            },
            {
              "x": "helicopter",
              "y": 230
            },
            {
              "x": "boat",
              "y": 139
            },
            {
              "x": "train",
              "y": 29
            },
            {
              "x": "subway",
              "y": 61
            },
            {
              "x": "bus",
              "y": 231
            },
            {
              "x": "car",
              "y": 180
            },
            {
              "x": "moto",
              "y": 160
            },
            {
              "x": "bicycle",
              "y": 65
            },
            {
              "x": "horse",
              "y": 168
            },
            {
              "x": "skateboard",
              "y": 203
            },
            {
              "x": "others",
              "y": 17
            }
          ]
        },
        {
          "id": "norway",
          "color": "hsl(47, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 65
            },
            {
              "x": "helicopter",
              "y": 21
            },
            {
              "x": "boat",
              "y": 91
            },
            {
              "x": "train",
              "y": 40
            },
            {
              "x": "subway",
              "y": 186
            },
            {
              "x": "bus",
              "y": 152
            },
            {
              "x": "car",
              "y": 138
            },
            {
              "x": "moto",
              "y": 158
            },
            {
              "x": "bicycle",
              "y": 218
            },
            {
              "x": "horse",
              "y": 136
            },
            {
              "x": "skateboard",
              "y": 245
            },
            {
              "x": "others",
              "y": 74
            }
          ]
        }
      ]
  return (
   <Box height={"50vh"} >
     <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve="basis"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
   </Box>
  )
}

export default LineGraphe