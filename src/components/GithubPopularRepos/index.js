import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const RepositoryItemStatus = {
  sucess: 'SUCESS',
  fail: 'FAIL',
  isprocess: 'ISPROCESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].language,
    courseDetails: [],
    activeRepositoryItemStatus: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const {activeLanguageId} = this.state
    this.setState({activeRepositoryItemStatus: RepositoryItemStatus.isprocess})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    console.log(apiUrl)
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const fecteData = data.popular_repos.map(each => ({
      avatarUrl: each.avatar_url,
      forksCount: each.forks_count,
      id: each.id,
      issuesCount: each.issues_count,
      name: each.name,
      starsCount: each.stars_count,
    }))

    if (response.ok === true) {
      this.setState({
        activeRepositoryItemStatus: RepositoryItemStatus.sucess,
        courseDetails: fecteData,
      })
    } else {
      this.setState({activeRepositoryItemStatus: RepositoryItemStatus.fail})
    }
  }

  getActiveLanguageId = id => {
    this.setState({activeLanguageId: id}, this.getProducts)
  }

  renderRepositoryItems = () => {
    const {courseDetails} = this.state
    return (
      <ul className="LanguageFilterItem-container">
        {courseDetails.map(each => (
          <RepositoryItem key={each.id} listItem={each} />
        ))}
      </ul>
    )
  }

  renderFailRepositoryItem = () => (
    <div className="fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="fail-image"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderRepositoryItemStatus = () => {
    const {activeRepositoryItemStatus} = this.state
    console.log(activeRepositoryItemStatus)
    switch (activeRepositoryItemStatus) {
      case RepositoryItemStatus.sucess:
        return this.renderRepositoryItems()
      case RepositoryItemStatus.fail:
        return this.renderFailRepositoryItem()
      case RepositoryItemStatus.isprocess:
        return this.renderFailLoaderItem()
      default:
        return null
    }
  }

  renderFailLoaderItem = () => (
    <div className="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {
      activeLanguageId,
      courseDetails,
      activeRepositoryItemStatus,
    } = this.state
    console.log(activeLanguageId, courseDetails, activeRepositoryItemStatus)
    return (
      <div className="container">
        <h1 className="heading">popular</h1>
        <ul className="LanguageFilterItem-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              filteredList={each}
              getActiveLanguageId={this.getActiveLanguageId}
            />
          ))}
        </ul>
        {this.renderRepositoryItemStatus()}
      </div>
    )
  }
}

export default GithubPopularRepos
