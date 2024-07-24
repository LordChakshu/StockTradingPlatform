import {useRouteError, Link} from 'react-router-dom';
import './error.css';

const Error = ()=>{

    const err=useRouteError();
    console.log(err);
    return (
        <div className='error-page-container'>
        <h1>Oops!!</h1>
        <h2>Error Status: {err.status}</h2>
        <h3>Page Not Found</h3>
        <p>Go to <Link to='/'>Homepage</Link></p>
        </div>
    );
}
export default Error;