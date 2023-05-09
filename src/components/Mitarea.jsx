import React, {useState} from "react";
import './style.css'

function Modal(props) {
    return (
        <div className="modal" style={props.style}>
            <div className="modal-content">
                {props.children}
            </div>
        </div>
    )
}
export const Mitarea=()=>{
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [career, setCareer] = useState('ISIC')
    const [imageUrl, setImageUrl] = useState('')

    const handleIdChange = (event) => {
        setId(event.target.value)
    }
    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleCareerChange = (event) => {
        setCareer(event.target.value)
    }
    const handleImageUpload = (event) => {
        const file = event.target.files?.[0]
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setImageUrl(reader.result)
        })
        if (file) {
            reader.readAsDataURL(file)
        }
    }

    const alumnos = []
    const [alumn,setAlumn]=useState(alumnos)

    const [showModal, setShowModal] = useState(false)
    const handleShowModal=()=>{
        setShowModal(true)
    }
    const handleCloseModal=()=>{
        setShowModal(false)
    }
    const [edit, setEdit] = useState(false)
    const [buttonSubmitText, setButtonSubmitText] = useState('Agregar')
    const [indexToEdit, setIndexToEdit] = useState(0)
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        backgroundColor: '#31626e',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(id===''||name===''||career===''||imageUrl===''){
            alert('These fields cannot be null')
        }else{
            if(edit===false){
                setAlumn([...alumn,{id:id,name:name,career:career,image:imageUrl}])
            }else{
                alumn[indexToEdit]={...alumn[indexToEdit],id:id,name:name,career:career,image:imageUrl}
                setAlumn(alumn)
                setButtonSubmitText('Agregar')
                setEdit(false)
            }
            setShowModal(false)
            setId('')
            setName('')
            setCareer('ISIC')
            setImageUrl('')
        }
    }

    const deleteElement=(id)=>{
        setAlumn(alumn.filter(obj => obj.id !== id))
    }
    const editElement=(index)=>{
        setId(alumn[index].id)
        setName(alumn[index].name)
        setCareer(alumn[index].career)
        setImageUrl(alumn[index].image)
        setEdit(true)
        setButtonSubmitText('Editar')
        setIndexToEdit(index)
        handleShowModal()
    }
    return(
        <>
        <div id="fondo">
        <div style={{textAlign:"center"}}>
                <button id={"buttonAddNew"} onClick={()=>handleShowModal()}>Agregar nuevo alumno</button>
            </div>
            {showModal &&
                <Modal style={modalStyle}>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Matricula:<input id={"inputs"} type={"number"} value={id} onChange={handleIdChange}/>
                        </label>
                        <br/><br/>
                        <label>
                            Nombre:<input id={"inputs"} type={"text"} value={name} onChange={handleNameChange}/>
                        </label>
                        <br/><br/>
                        <label>
                            Carrera:
                            <select id={"inputs"} value={career} onChange={handleCareerChange}>
                                <option value={"ISIC"}>Ing. ISIC</option>
                                <option value={"Quimica"}>Ing. Quimica</option>
                                <option value={"TICs"}>Ing. TIC's</option>
                                <option value={"Civil"}>Ing. Civil</option>
                                <option value={"Industrial"}>Ing. Industrial</option>
                                <option value={"Administracion"}>Lic. Administracion</option>
                                <option value={"Mecatronica"}>Ing. Mecatronica</option>
                                <option value={"Logistica"}>Ing. Logistica</option>
                            </select>
                        </label>
                        <br/><br/>
                        <input type={"file"} accept={"image/*"} onChange={handleImageUpload}/>
                        <br/><br/><br/>
                        <button id={"buttonAdd"} type={"submit"}>{buttonSubmitText}</button>
                        <button id={"buttonCancel"} onClick={handleCloseModal}>Cancelar</button>
                    </form>
                </Modal>
            }
            <div id={"contenedor"}>
                <table border={1} style={{margin:"50px",textAlign:"center"}}>
                    <thead>
                    <tr>
                        <th id={"th2rem"}></th>
                        <th style={{width:"3rem"}}>Matricula</th>
                        <th id={"th8rem"}>Nombre</th>
                        <th id={"th8rem"}>Carrera</th>
                        <th style={{width:"15rem"}}>Foto</th>
                        <th id={"th2rem"}></th>
                        <th id={"th2rem"}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        alumn.map((item,index)=>(
                            <tr>
                                <td>{index}</td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.career}</td>
                                <td><img src={item.image} className="img" alt="img"/></td>
                                <td><button id={"buttonAdd"} onClick={()=>editElement(index)}>Editar</button></td>
                                <td><button id={"buttonCancel"} onClick={()=>deleteElement(item.id)}>Eliminar</button></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
            
        </>
    )
}