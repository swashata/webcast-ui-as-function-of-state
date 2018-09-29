/**
 * UI As a Function of State
 *
 * ## Modern JS 101
 */

// ========================================== //
// Coming from concepts.js, let's create an
// API of sort, to make it
// 1. Abstract away the DOM Manipulation.
// 2. Give a method to change the state
// 3. When we update the state, the UI updates
// What I've not considered here
// (in case future expert 👨‍🔬 you yells at me)
// 1. Using pure functions: The setState
//    mutates the state, which is bad.
// 2. Keeping a sort of virtual DOM to improve
//    performance. That's heavy lifting.
// So make sure, future you doesn't yell at me!
// ========================================== //
class OurSuperAwesomeNameAgeListAPI {
	constructor(entryPoint, state) {
		this.entryPoint = entryPoint;
		this.state = state;
		this.updateUI = this.updateUI.bind(this);
		this.setState = this.setState.bind(this);
		this.getState = this.getState.bind(this);
		this.updateUI();
	}

	updateUI() {
		const {name, age} = this.state;
		// This is a very very very bad implementation details
		// Where we just reconstruct everything, regardless of
		// what has actually changed.💩
		const ourUI = `<ul><li>Name: ${name}</li><li>Age: ${age}</li></ul>`;
		this.entryPoint.innerHTML = ourUI;
	}

	setState(newState) {
		const _this = this;
		// Iterate over the keys of the object being passed
		Object.keys(newState).forEach(function(key) {
			_this.state[key] = newState[key];
		});
		// Let's update our actual DOM
		this.updateUI();
	}

	getState() {
		return this.state;
	}
}

// State of our Application
// @observer
// single source of truth
// const state = {
// 	name: 'Mahesh',
// 	age: '30',
// };
const entryPoint = document.querySelector('#app');
const superAwesomeNameAgeList = new OurSuperAwesomeNameAgeListAPI(entryPoint, {
	name: 'Mahesh',
	age: '30',
});

const anotherNameAgeList = new OurSuperAwesomeNameAgeListAPI(document.querySelector('#anotherapp'), {name: 'Amitavo', age: 900});

// Hook into the button
document.querySelector('#update').addEventListener('click', function(e) {
	e.preventDefault();
	const state = superAwesomeNameAgeList.getState();
	const newName = state.name === 'Mahesh' ? 'Swashata' : 'Mahesh';
	superAwesomeNameAgeList.setState({name: newName, foo: 'bar'});
});
document.querySelector('#age').addEventListener('click', function(e) {
	e.preventDefault();
	const state = superAwesomeNameAgeList.getState();
	const newAge = state.age === 30 ? 130 : 30;
	superAwesomeNameAgeList.setState({age: newAge});
});

// React
// React is providing a virtual state which represents our DOM
// When we change the virtual state, react handles the DOM

// Updated

// Using data from our server
// jQuery.getJSON('http://endpoint.to/json/api').done(function(response) {
// 	superAwesomeNameAgeList.setState(response);
// })
