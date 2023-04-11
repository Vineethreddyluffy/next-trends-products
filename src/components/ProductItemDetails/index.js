import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import GetItem from '../SimilarProductItem'
import Header from '../Header'

import './index.css'

class ProductItemDetails extends Component {
  state = {listOf: '', count: 1, status: 'loading'}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)
    if (response.ok === false) {
      this.setState({status: 'failure'})
    }
    const data = await response.json()

    const updatedData = {
      availability: data.availability,
      brand: data.brand,
      description: data.description,
      id: data.id,
      imageUrl: data.image_url,
      price: data.price,
      rating: data.rating,
      similarProducts: data.similar_products,
      title: data.title,
      totalReviews: data.total_reviews,
    }
    if (response.ok) {
      this.setState({status: 'success', listOf: updatedData})
    }
  }

  increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  decrement = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({
        count: prevState.count - 1,
      }))
    }
  }

  success = () => {
    const {listOf, count} = this.state
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
      similarProducts,
    } = listOf
    return (
      <>
        <Header />
        <div className="full-cont">
          <div className="cont">
            <div className="inner-cont">
              <img src={imageUrl} alt="product" className="main-img" />
              <div>
                <h1 className="main-head">{title}</h1>
                <p className="price-para">Rs {price}/-</p>
                <div className="rating-cont">
                  <div className="star-cont">
                    <p className="rating-para">{rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                  </div>
                  <p className="para1">{totalReviews} Reviews</p>
                </div>
                <p className="para1">{description}</p>
                <p className="para1">
                  <span className="para2">Available: </span>
                  {availability}
                </p>
                <p className="para1">
                  <span className="para2">Brand: </span>
                  {brand}
                </p>
                <hr />
                <div className="button-cont">
                  <button
                    className="button"
                    type="button"
                    onClick={this.decrement}
                    data-testid="minus"
                  >
                    <BsDashSquare />
                  </button>
                  <p className="count-para">{count}</p>
                  <button
                    type="button"
                    className="button"
                    onClick={this.increment}
                    data-testid="plus"
                  >
                    <BsPlusSquare />
                  </button>
                </div>
                <button type="button" className="add-btn">
                  ADD TO CART
                </button>
              </div>
            </div>
            <div>
              <p className="sub-head">Similar Products</p>
              <ul className="card-cont">
                {similarProducts.map(each => (
                  <GetItem key={each.id} item={each} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }

  loading = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  shopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  failure = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="err-img"
      />
      <h1 className="err-para">Product Not Found</h1>
      <button type="button" className="shop-btn" onClick={this.shopping}>
        Continue Shopping
      </button>
    </div>
  )

  render() {
    const {status} = this.state
    switch (status) {
      case 'loading':
        return this.loading()
      case 'success':
        return this.success()
      case 'failure':
        return this.failure()
      default:
        return null
    }
  }
}

export default withRouter(ProductItemDetails)
