import './mainHeader.css';

const MainHeader = ({children}) => {
    return(
        <>
        <header className='main-header'>{children}</header>
        </>
    );
}

export default MainHeader;
