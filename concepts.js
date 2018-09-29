// ========================================== //
// The concept is to call a function to
// Change the UI, so let's see how we can do
// It. No 🔥 APIs please, keep things simple
// ========================================== //

// State of our Application
// @observer
// single source of truth
let state = {
	name: 'Mahesh',
	age: '30',
};

function updateUI(state, element) {
	const ourUI = `<ul><li>Name: ${state.name}</li><li>Age: ${state.age}</li></ul>`;
	element.innerHTML = ourUI;
}
const entryPoint = document.querySelector('#app');

function updateName(state, newName) {
	state.name = newName;
	updateUI(state, entryPoint);
}

// User Interface is function of a state
updateUI(state, entryPoint);
// We pass our state to the function
// Function generates our UI
// Function updates our UI

// Hook into the button
document.querySelector('#update').addEventListener('click', function(e) {
	e.preventDefault();
	const newName = state.name === 'Mahesh' ? 'Swashata' : 'Mahesh';
	updateName(state, newName);
});

// React
// React is providing a virtual state which represents our DOM
// When we change the virtual state, react handles the DOM
