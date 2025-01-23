import './input.css';
const Input = (props) => {
    return(
        <>
         <div className='form-control'>
            <label htmlFor={props.id}>{props.label}</label>
            {props.element=="input" ? 
            <input id={props.id} type={props.type} placeholder={props.placeholder} /> : 
            <textarea id={props.id} rows={props.rows || 3} cols={props.cols || 20} />}
         </div>
        </>
    );
}


export default Input;