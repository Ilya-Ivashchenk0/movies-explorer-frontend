import './Notify.css'
import success from '../../images/success.svg'
import unsucces from '../../images/unsuccess.svg'

const Notify = ({ message, isSuccess }) => {
  return (
    <div className='notify'>
      <div className='notify__container'>
        <img className='notify__img' src={isSuccess ? success : unsucces} alt={message} />
        <p className={`notify__message ${isSuccess ? 'notify__message_type_success': ''}`}>{ message }</p>
      </div>
    </div>
  )
}

export default Notify
