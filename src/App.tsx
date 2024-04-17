
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
        console.log(data);
      
    } catch (error) {
      console.log(error)
    }
    

  }

  return (
    <>
      <div>
        <h1 className='text-center'>Youtube Downloader</h1>
        <form className='d-flex container' onSubmit={ handleSubmit }>
          <label>Ingresa la url</label>
          <input type="text" className='mx-3 form-control' value={ url } onChange={(e) => setUrl(e.target.value)}/>
          <button type="submit"className='btn btn-primary' >Buscar</button>
        </form>
      </div>
    <br />
      <div>
        {
          downloadUrl && <a type='button' className='btn btn-primary' href={ downloadUrl } target='_blank'>Descargar</a>
        }
      </div>
    </>
  )
}

export default App
