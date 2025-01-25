import React, {useState, useEffect} from 'react'
import PageHeader from './PageHeader'

const ImageHome = () => {
    const [chartData, setChartData] = useState({})
    const [img, setImg] = useState();

    const fetchImage = async() => {
      const res = await fetch('http://localhost:8080/api/v1/chart-data');
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    }

    useEffect(() => {
      fetchImage();
    }, []);

    return (
        <>
        <PageHeader title={'Dashboard'}/>
        <img src={img} alt="icons" />
        </>
    )
}

export default ImageHome
