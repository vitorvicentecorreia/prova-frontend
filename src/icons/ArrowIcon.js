export default function ArrowIcon({ open }) {
    return (
        <svg style={{ transition: '0.5s', transform: open && 'rotate(-180deg)' }}  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 58.5 36.3" enableBackground="new 0 0 58.5 36.3" space="preserve">
            <title>Ícone de seta</title>
            <path fillRule="evenodd" clipRule="evenodd" fill={ open ? '#00a1fe' : "#7b7b7b"} d="M55.4,10.8L33.1,33c-1.8,2-5,2-6.9,0L4.1,10.8
	c-2.1-2-2.6-4.6-0.5-6.6l0.8-0.8c1.8-1.7,3.8-2.1,5.5-0.3c5.4,5.5,10.8,11,16.3,16.5c1.9,1.8,5,1.8,6.9,0c5.5-5.5,11-11,16.5-16.5
	c1.5-1.7,3.6-1.4,5.3,0.3l0.8,0.8C57.7,6.2,57.2,8.9,55.4,10.8L55.4,10.8z"/>
        </svg>
    )
}