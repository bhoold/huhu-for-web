const state = {
	productList: []
}

const mutations = {
	diamondList_productList: (state,data) =>{
		if(_.isArray(data)){
			state.productList = data;
		}else{
			state.productList = [];
		}
	}
}

export default {
	state,
	mutations
}
