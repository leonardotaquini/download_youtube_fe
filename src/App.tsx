
import { useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {

  const [url, setUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        setDownloadUrl('');
        const { data } = await axios.post('http://localhost:8000/download/', {
          url
        } );
        setDownloadUrl(data.url_download);      
    } catch (error) {
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
    <div className='vh-100 d-flex flex-column'>
      <h1 className='d-flex justify-content-center'>
        <p className='h1' style={{color: 'red'}}>Youtube</p> 
        <p className='h1 text-secondary'>Downloader</p>
        </h1>
      <div className=' m-auto col-6'>
        <h5 className='text-center'>Ingresa el link</h5>
        <form className='d-flex flex-column flex-sm-row flex-lg-row' onSubmit={ handleSubmit }>
          <input type="text" className='form-control' value={ url } onChange={(e) => setUrl(e.target.value)}/>
          <button type="submit"className='btn btn-outline-primary col-12 col-sm-4 col-lg-3'  >Buscar</button>
        </form>
      </div>
      <div>
        {
          downloadUrl && 
          <div>
            <button className='btn btn-primary' onClick={ download }>Descargar</button>
          </div>
          
        }
      </div>
    </div>
  )
}

export default App
