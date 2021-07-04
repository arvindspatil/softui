import Carousel from 'react-bootstrap/Carousel'
import ChartV1 from './ChartV1'

function MyCarousal({ chartData }) {
    return (
        <Carousel>
            <Carousel.Item>
            <ChartV1 chartData={chartData.checkingData} />
            </Carousel.Item>
            <Carousel.Item>
            <ChartV1 chartData={chartData.savingsData} />
            </Carousel.Item>
            <Carousel.Item>
            <ChartV1 chartData={chartData.invData} />
            </Carousel.Item>
            <Carousel.Item>
            <ChartV1 chartData={chartData.loanData} />
            </Carousel.Item>
            <Carousel.Item>
            <ChartV1 chartData={chartData.creditData} />
            </Carousel.Item>
            <Carousel.Item>
            <ChartV1 chartData={chartData.netData} />
            </Carousel.Item>
</Carousel>
    )
}

export default MyCarousal

