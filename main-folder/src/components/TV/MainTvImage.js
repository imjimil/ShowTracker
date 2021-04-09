import React from 'react';
import Carousel from 'react-bootstrap/Carousel'


function MainTvImage(props) {
    return (
        <Carousel>
            <Carousel.Item>
            <a href={`/tv/${props.tvshowid}`}>
                <div style={{background:`url('${props.image}')`, height:'75vh', backgroundSize:'cover'}}></div>
                <Carousel.Caption>
                    <h1 className='font-weight-bolder'>{props.title}</h1>
                    <p>{props.text}</p>
                </Carousel.Caption>
            </a>
            </Carousel.Item>
            <Carousel.Item>
            <a href={`/tv/${props.tvshowid1}`}>
                <div style={{background:`url('${props.image1}')`, height:'75vh', backgroundSize:'cover'}}></div>
                    <Carousel.Caption>
                        <h1 className='font-weight-bolder'>{props.title1}</h1>
                        <p>{props.text1}</p>
                    </Carousel.Caption>
            </a>
            </Carousel.Item>
            <Carousel.Item>
            <a href={`/tv/${props.tvshowid2}`}>
                <div style={{background:`url('${props.image2}')`, height:'75vh', backgroundSize:'cover'}}></div>
                    <Carousel.Caption>
                        <h1 className='font-weight-bolder'>{props.title2}</h1>
                        <p>{props.text}</p>
                    </Carousel.Caption>
            </a>
            </Carousel.Item>
</Carousel>
    )
}

export default MainTvImage;