import './index.css'

const CategoryItem = ({eachTag, isActive, onClickTag}) => {
  const {optionId, displayText} = eachTag

  const tagClicked = () => {
    onClickTag(isActive, optionId)
  }

  return (
    <li>
      <button
        className={isActive ? 'btn-bg' : ''}
        type="button"
        onClick={tagClicked}
      >
        <p>{displayText}</p>
      </button>
    </li>
  )
}
export default CategoryItem
