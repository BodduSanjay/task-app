import {Component} from 'react'
import {v4 as uudiv4} from 'uuid'
import CategoryItem from '../CategoryItem'

class TaskPage extends Component {
  constructor(props) {
    super(props)
    const {tagsList} = this.props
    this.state = {
      task: '',
      tagsList,
      selectedTag: tagsList[0],
      tasksList: [],
      activeId: '',
      initialList: [],
    }
  }

  handleChangeTask = event => {
    this.setState({task: event.target.value})
  }

  handleTagChange = event => {
    const id = event.target.value
    const {tagsList} = this.state
    const selectedTag = tagsList.find(each => each.optionId === id)
    this.setState({selectedTag})
  }

  handleSubmit = event => {
    event.preventDefault()
    const {task, selectedTag} = this.state
    if (task !== '') {
      const newTask = {
        task,
        selectedTag,
      }
      this.setState(prevState => ({
        initialList: [...prevState.initialList, newTask],
        tasksList: [...prevState.tasksList, newTask],
        task: '',
      }))
    }
  }

  onClickTag = (isActive, optionId) => {
    const {initialList} = this.state

    if (isActive) {
      this.setState({tasksList: initialList, activeId: ''})
    } else {
      const newFilteredList = initialList.filter(
        each => each.selectedTag.optionId === optionId,
      )
      this.setState({tasksList: newFilteredList, activeId: optionId})
    }
  }

  render() {
    const {task, tagsList, activeId, tasksList} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Create a task!</h1>
          <label htmlFor="inputEl">Task</label>
          <input
            type="text"
            id="inputEl"
            value={task}
            placeholder="Enter the task here"
            onChange={this.handleChangeTask}
          />
          <label htmlFor="optionEl">Tags</label>
          <select id="optionEl" onChange={this.handleTagChange}>
            {tagsList.map(tag => (
              <option key={uudiv4()} value={tag.optionId}>
                {tag.displayText}
              </option>
            ))}
          </select>
          <button type="submit">Add Task</button>
        </form>
        <div>
          <div>
            <h1>Tags</h1>
            <ul>
              {tagsList.map(eachTag => (
                <CategoryItem
                  eachTag={eachTag}
                  key={eachTag.optionId}
                  isActive={eachTag.optionId === activeId}
                  onClickTag={this.onClickTag}
                />
              ))}
            </ul>
          </div>
          <div>
            <h1>Tasks</h1>
            <ul>
              {tasksList.length !== 0 ? (
                tasksList.map(each => (
                  <li key={uudiv4()}>
                    <p>{each.task}</p>
                    <p>{each.selectedTag.displayText}</p>
                  </li>
                ))
              ) : (
                <div>
                  <p>No Tasks Added Yet</p>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default TaskPage
