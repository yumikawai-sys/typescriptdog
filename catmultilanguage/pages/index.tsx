import { NextPage, GetServerSideProps } from "next";
import { useState } from 'react';
// import "semanticui-ui-css/semanticui.min.css";
import {Loader} from 'semantic-ui-react';

interface Props {
  initialImageUrl: string;
}

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl); 
  const [loading, setLoading] = useState(false); 

  const clickHandle = () => {
    // setLoading(true); 
    fetchImage().then((newImage) => {      
      setImageUrl(newImage.message); 
      setLoading(false); 
    });
  }

  return (
    <div style={{
      display:"flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vm"
    }}>
    <h2 style={{marginTop:20}}>Meet with your friend today!</h2>
    {/* {
    loading ? <Loader active/>
    :
    <img style={{marginTop:20, width:300, maxHeight:500, height:"auto"}}  src={imageUrl} />
    } */}
    <img style={{marginTop:20, width:300, maxHeight:500, height:"auto"}}  src={imageUrl} />
    <button style={{marginTop:20, width:300, height:40, borderColor:"#FFF", 
    backgroundColor:"#FF007F", color:"#FFF", borderRadius:"10px"}} onClick={clickHandle}>Who's Next?</button>
    </div>
  );
};
export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.message,
    },
  };
};

type Image = {
  message: string;
};
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://dog.ceo/api/breeds/image/random");
  const images = await res.json();
  console.log(images.message);
  return images;
};

fetchImage(); 