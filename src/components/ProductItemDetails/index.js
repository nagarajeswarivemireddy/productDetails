/* eslint-disable no-unused-vars */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

class ProductItemDetails extends Component {
  state = {count: 1, productDetails: [], isLoading: true}

  renderProductDetails = () => {
    const {productDetails, count} = this.state

    const {
      imageUrl,
      id,
      title,
      brand,
      price,
      description,
      availability,
      totalReviews,
      rating,
      similarProducts,
    } = productDetails

    return (
      <div className="productContainer">
        <img src={imageUrl} alt={title} />
        <div className="productInformation">
          <h1 className="title">{title}</h1>
          <h2 className="price">RS {price}</h2>
          <div className="ratingContainer">
            <button className="button" type="button">
              {rating}*
            </button>

            <p>{totalReviews}Reviews</p>
          </div>
          <p>{description}</p>
          <p>Available:{availability}</p>
          <p>Brand:{brand}</p>
          <hr />
          <div className="incrementDecrement">
            <button className="decrement" type="button">
              -
            </button>
            <p>{count}</p>
            <button className="increment" type="button">
              +
            </button>
          </div>
          <button className="button" type="button">
            Add To Cart
          </button>
        </div>
      </div>
    )
  }

  componentDidMount = () => {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const updatedData = {
      id: data.id,
      imageUrl: data.image_url,
      title: data.title,
      brand: data.brand,
      totalReviews: data.total_reviews,
      price: data.price,
      description: data.description,
      rating: data.rating,
      availabilty: data.availability,
      similarProducts: data.similar_products,
    }
    this.setState({productDetails: updatedData, isLoading: false})
  }

  render() {
    const {count, productDetails, isLoading} = this.state

    return (
      <div className="product-details-container">
        <Header />
        {isLoading ? (
          <Loader type="ThreeDots" height={50} width={50} color="#00B" />
        ) : (
          this.renderProductDetails()
        )}
      </div>
    )
  }
}
export default ProductItemDetails
