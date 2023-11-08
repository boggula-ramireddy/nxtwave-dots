import './index.css'

const LanguageFilterItem = props => {
  const {filteredList, getActiveLanguageId} = props
  const {id, language} = filteredList

  const onClickLanguageItem = () => {
    getActiveLanguageId(id)
  }
  return (
    <li className="LanguageFilterItem-items">
      <button type="button" className="button" onClick={onClickLanguageItem}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
