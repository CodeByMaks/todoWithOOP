import { Component } from 'react'
import './App.css'
import { ITodo } from './types/type'
import { Modal } from 'antd'

class App extends Component<void, { data: ITodo[], open: boolean, addTitle: string, addDescription: string, editTitle: string, editDescription: string, editId: number | null  }> {
	constructor(props: void) {
		super(props)
		this.state = {
			data: [
				{ id: 1, title: 'Hello world1', description: 'Remove world', status: false},
				{ id: 2, title: 'Hello world2', description: 'Remove world', status: true},
				{ id: 3, title: 'Hello world3', description: 'Remove world', status: false},
			],
			open: false,
			addTitle: '',
			addDescription: '',
			editTitle: '',
			editDescription: '',
			editId: null
		}
	}

	deleteTodo = (id: number | null) => {
		return this.setState({
			data: this.state.data.filter(todos => todos.id !== id),
		})
	}

	setOpen = (isOpen: boolean) => {
		this.setState({open: isOpen})
	}

	setAddTitle = (title: string) => {
		this.setState({addTitle: title})
	}

	setAddDesc = (description: string) => {
		this.setState({addDescription: description})
	}

	setEditTitle = (title: string) => {
		this.setState({editTitle: title})
	}

	setEditDescription = (title: string) => {
		this.setState({editDescription: title})
	}

	handleAddTodo = () => {
		const newTodo = {
			id: Date.now(),
			title: this.state.addTitle,
			description: this.state.addDescription,
			status: false
		}
		this.setState((prevdata) =>(
			{
				data : [...prevdata.data, newTodo],
				addTitle: '',
				addDescription: '',
				open: false
			}
		)
	)}

	ModalEditTodo = (todos: ITodo) => {
		this.setState({
			open: true,
			editTitle: todos.title,
			editDescription: todos.description,
			editId: todos.id
		})
	}

	handleEditTodo = () => {
		const {editTitle, editDescription, editId} = this.state
		if (editId === null) return 

		this.setState(prevdata => ({
			data: prevdata.data.map((todos)=> (
				todos.id === editId ? {...todos, title: editTitle, description: editDescription} : todos
			)),
			open: false,
			editTitle: '',
			editDescription: '',
			editId: null
		}))
	}

	toogleStatus = (id: number | null) => {
		this.setState((prevdata) => (
			{
				data: prevdata.data.map((state) => (
					state.id === id ? {...state, status: !state.status} : state
				)),
			}
		))
	}

	renderTodos = () => {
		return this.state.data.map(todos => (
			<div className='box' key={todos.id}>
				<h1 style={{textDecoration: todos.status ? 'line-through': 'none'}}>{todos.title}</h1>
				<p style={{textDecoration: todos.status ? 'line-through': 'none'}}>{todos.description}</p>
				<div className='box__tool'>
					<button
						onClick={() => this.deleteTodo(todos.id)}
						className='box__button--delete'
					>
						Delete
					</button>
					<button onClick={() => this.ModalEditTodo(todos)}>Edit</button>
				</div>
				<div className='box__check'>
					<input checked={todos.status} onChange={()=> this.toogleStatus(todos.id)} type='checkbox' />
					<p>{todos.status ? 'Done' : 'Not Done'}</p>
				</div>
			</div>
		))
	}

	render() {
		const {addTitle, addDescription, editTitle, editDescription, editId } = this.state
		
		return (
			<>
				<h1 style={{ textAlign: 'center', padding: '10px' }}>
					ToDo List with OOP
				</h1>
				<div
					style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}
				>
					<button onClick={()=> this.setOpen(true)} className='button__cont'>ADD +</button>
				</div>
				<div className='container'>{this.renderTodos()}</div>

				{/*Add Modal*/}
				<Modal open={this.state.open} onCancel={()=> this.setOpen(false)} onOk={this.handleAddTodo} >
					<h1 style={{textAlign: 'center'}}>Add Task</h1>
					<div className='addModal'>
						<input type="text" value={addTitle} onChange={(e) => this.setAddTitle(e.target.value)} placeholder='Title...'/>
						<input type="text" value={addDescription} onChange={(e)=> this.setAddDesc(e.target.value)} placeholder='Description...'/>
					</div>
				</Modal>

				{/*Edit Modal*/}
				<Modal open={this.state.open && editId !== null} onCancel={()=> this.setOpen(false)} onOk={this.handleEditTodo} >
					<h1 style={{textAlign: 'center'}}>Edit Task</h1>
					<div className='addModal'>
						<input type="text" value={editTitle} onChange={(e) => this.setEditTitle(e.target.value)} placeholder='Title...'/>
						<input type="text" value={editDescription} onChange={(e)=> this.setEditDescription(e.target.value)} placeholder='Description...'/>
					</div>
				</Modal>
			</>
		)
	}
}

export default App
