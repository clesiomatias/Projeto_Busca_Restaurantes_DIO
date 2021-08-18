import ReactDom from 'react-dom';


export default function Portal({ children }) {
    const portal = document.getElementById('modal-root');

    return ReactDom.createPortal(children, portal);

}