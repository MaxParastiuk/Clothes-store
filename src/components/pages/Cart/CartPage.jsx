import { Component } from "react";
import { connect } from "react-redux";
import {
	getTaxFromAmount,
	orderCartItems,
} from "../../../redux/feature/cartSlice";
import CartItem from "../../common/main/CartItem";
import CartModal from "../../common/cartModal/CartModal";
import "./CartPage.scss";

class CartPage extends Component {
	componentDidMount() {
		this.props.getTaxFromAmount();
	}

	componentDidUpdate() {
		this.props.getTaxFromAmount();
	}

	render() {
		const { totalAmount, totalCount, items, tax } = this.props.cart;
		const { selectedOption } = this.props.currency;
		return (
			<>
				<div className='cart__page container'>
					<div className='content__cart_main'>
						{items.map((item, index) => (
							<CartItem key={index} item={item}></CartItem>
						))}
					</div>
					<div className='content__cart_footer '>
						<div className='price__tax'>
							<div className='price__tax_title'>Tax 21% : </div>
							<div className='price__tax_number footer_number '>
								{selectedOption + " " + tax}
							</div>
						</div>
						<div className='price__quantity'>
							<div className='price__quantity_title'>Quantity :</div>
							<div className='price__quantity_number footer_number '>
								{" "}
								{totalCount}
							</div>
						</div>

						<div className='price'>
							<div className='price__title_total'>Total: </div>
							<div className='price__number footer_number '>
								{selectedOption + " " + totalAmount}
							</div>
						</div>
					</div>
					<button
						className='cart__footer_btn-order'
						onClick={() => this.onClickOrderButton()}>
						ORDER
					</button>
					{this.props.cart.isCartOpen && <CartModal />}
				</div>
			</>
		);
	}

	onClickOrderButton() {
		this.props.orderCartItems();
	}
}

const mapStateToProps = (state) => {
	return {
		cart: state.cart,
		currency: state.currency,
	};
};

const mapDispatchToProps = (dispatch) => ({
	orderCartItems: () => dispatch(orderCartItems()),
	getTaxFromAmount: () => dispatch(getTaxFromAmount()),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(CartPage);
