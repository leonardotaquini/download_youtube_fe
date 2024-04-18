
import { useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {

  const [url, setUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

 
  

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        setDownloadUrl('');
        const { data } = await axios.post('http://localhost:8000/download/', {
          url
        } );
        setDownloadUrl(data.url_download); 
        setIsLoading(false);     
    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
    

  }

  const download = () => {
  
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.click();
    a.remove();
    setDownloadUrl('');
    
  }

  return (
    <div className='vh-100 d-flex flex-column justify-content-center align-items-center mt-5'>
      <h1 className='d-flex justify-content-center shadow p-3 rounded my-5'>
        <p className='h1' style={{color: 'red'}}>Youtube</p> 
        <p className='h1 text-secondary'>Downloader</p>
      </h1>
      
        
      <div className='col-11 col-sm-10 col-lg-6 p-2'>
        <h5 className='text-center'>Ingresa el link</h5>
        <form className='d-flex flex-column flex-sm-row flex-lg-row ' onSubmit={ handleSubmit }>
          <input type="text" className='form-control m-2' value={ url } onChange={(e) => setUrl(e.target.value)}/>
          <button type="submit"className='btn btn-outline-primary col-12 col-sm-4 col-lg-3 m-2' disabled={ isLoading } >Buscar</button>
        </form>
      </div>
      <div className='my-5'>
        {
          downloadUrl && 
          <div>
            <button className='btn btn-primary' onClick={ download }>Descargar</button>

          </div>
          
        }
        {
          isLoading &&
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default App
