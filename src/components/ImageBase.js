import React, {useState, useEffect} from 'react'
import PageHeader from './PageHeader'

const ImageBase = () => {
    const [img, setImg] = useState();
    const [front, setFront] = useState();
    const [back, setBack] = useState();
    const [it, setit] = useState();

    const fetchImage = async() => {
      const res = await fetch('http://localhost:8080/api/v1/chart-data');
      console.log("Arvind");
      const data = await res.json();
      console.log(data.front);
      setFront(data.front);
      setBack(data.back);
      setit("image/jpeg");
      // const frontblob = data.front.blob();
//      const imageBlob = await res.blob();
      // const imageObjectURL = URL.createObjectURL(frontblob);
      // setImg(imageObjectURL);
    }

    useEffect(() => {
      fetchImage();
    }, []);

    return (
        <>
        <PageHeader title={'Dashboard'}/>
        <img src={`data:${it};base64,${front}`} alt="icons" />
        <img src={`data:image/jpeg;base64,${back}`} alt="icons" />
        </>
    )
}

export default ImageBase
