import './index.css'

const RepositoryItem = props => {
  const {listItem} = props
  const {avatarUrl, forksCount, issuesCount, starsCount, name} = listItem
  return (
    <div className="repositoryItem-container">
      <img src={avatarUrl} alt={name} className="img" />
      <p>{name}</p>
      <p className="name">
        <span>
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="star-icon"
          />
        </span>
        {starsCount}
      </p>
      <p className="name">
        <span>
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="star-icon"
          />
        </span>
        {forksCount}
      </p>
      <p className="name">
        <span>
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="star-icon"
          />
        </span>
        {issuesCount}
      </p>
    </div>
  )
}

export default RepositoryItem
