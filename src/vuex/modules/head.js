const state = {
	//搜索框的下拉当前选中项
	dropdownSelected: {
		api: '',
		url: '',
		title: '',
		params: ''
	},
	//搜索框参数
	searchKeyWord: {
		PageIndex: 1,
		PageSize: 15,
		SortName: '',
		SortType: '',
		Select: '', //搜索框
		AttributeSearch: [] //选中的产品分类
	},
	number: {
		cart: 0,
		order: 0
	},
	goldPriceList: {},
	homeData: {
		NickName: "",
		CategoryList: [],
		GoldPriceList: {},
		Level: "",
		LevelName: "",
		Logo: ""
	},
	getCorresNumber: {
		TotalIntention: 0,
		TotalCart: 0,
		TotalOrder: 0
	}
}

const mutations = {
	head_dropdownSelected: (state,data) =>{
		_.each(state.dropdownSelected, (value, key) => {
			if(data[key] != null){
				state.dropdownSelected[key] = data[key]
			}
		});
	},
	head_searchKeyWord: (state,data) =>{
		_.each(state.searchKeyWord, (value, key) => {
			if(data[key] != null){
				state.searchKeyWord[key] = data[key]
			}
		});
	},
	head_number: (state,data) =>{
		_.each(state.number, (value, key) => {
			if(data[key] != null){
				state.number[key] = data[key]
			}
		});
	},
	head_goldPriceList: (state,data) =>{
		state.goldPriceList = data
	},
	head_homeData: (state,data) =>{
		state.homeData = data
	},
	headGetNumber: (state,data) =>{
		state.getCorresNumber = data;
	}
}
const actions = {
	head_getNumber:(context) =>{
		let data = {};
		Site.get({
			url: Site.api.headerData.getTotalNumber
		}).done(res => {
			if(res && res.code == 1001){
				data = res.data;
			}
			context.commit("headGetNumber",data)
		}).fail(err => {
			data = {
				TotalIntention: 0,
				TotalCart: 0,
				TotalOrder: 0
			}
			context.commit("headGetNumber",data)
		})
	}
}

export default {
	state,
	mutations,
	actions
}
