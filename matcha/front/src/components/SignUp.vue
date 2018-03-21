<template>
  <div id="signUp">
	  <form id="app" @submit="checkForm">
	  
	  	<p v-if="errors.length">
			  <b>Veuillez corriger les erreurs suivantes s'il vous plaît: </b>
			  <ul>
				  <li v-for="(error, index) in errors" v-bind:key="index"  class="">{{ error }}</li>
				</ul>
		</p>

		<p>
			<label for="firstName">Prénom</label>
			<input type="text" name="firstName" id="firstName" placeholder="Ex: John" v-model="user.firstName">
		</p>
		
		<p>
			<label for="lastName">Nom de famille</label>
			<input type="text" name="lastName" id="lastName" placeholder="Ex: Smith" v-model="user.lastName">
		</p>
		
		<p>
			<label for="email">Adresse Mail</label>
			<input type="text" name="email" id="email" placeholder="Ex: john.smith@mail.fr" v-model="user.email">
		</p>

		<p>
			<label for="password">Mot de passe</label>
			<input type="password" name="password" id="password" placeholder="******" v-model="user.password">
			<small id="passwordHelpInline" class="form-text text-muted">
      			Votre mot de passe doit avoir au moins 6 caractères et au moins 1 lettre et 1 chiffre.
    		</small>
		</p>

		<p>
			<label for="birthday">Date de naissance</label>
			<select name="days" id="days" v-model="user.birthday[0]">
				<option v-for="nb in 31" v-bind:key="nb">{{ nb }}</option>
			</select>
			<select name="months" id="months" v-model="user.birthday[1]">
				<option v-for="(month, index) in months" v-bind:key="index">{{ month }}</option>
			</select>
			<select name="years" id="years" v-model="user.birthday[2]">
				<option v-for="nb in 100" v-bind:key="nb">{{ nb + years - 100 }}</option>
			</select>
		</p>

		<p>
			<label for="male">Vous êtes: </label>
			<input type="checkbox" id="male" value="homme" @click="checker('male', 'female')">
			<label for="male">un homme</label>
			<input type="checkbox" id="female" value="femme" @click="checker('female', 'male')">
			<label for="female">une femme</label>
		</p>

		<p>
			<label for="orientation">Vous êtes</label>
			<select name="orientation" id="orientation" v-model="user.orientation">
				<option>Hétéro</option>
				<option>Homo</option>
				<option>Bi</option>				
			</select>
		</p>

		<p>
			<label for="address">Votre adresse</label>
			<vue-google-autocomplete
				ref="address"
				id="map"
				autocomplete="new-password"
				classname="form-control"
				placeholder="Start typing"
				v-on:placechanged="getAddressData"
				:enable-geolocation="true"
				class="form-control mx-sm-3">
			</vue-google-autocomplete>
		</p>
		
		<p>
			<input type="submit" value="Sign Up">  
		</p>
		
	</form>
</div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  name: 'SignUp',
  components: {
	  VueGoogleAutocomplete
  },
  data () {
	  return {
		  errors: [],
		  user: {
			  firstName: null,
			  lastName: null,
			  email: null,
			  password: null,birthday: [],
			  age: null,
			  kind: null,
			  orientation: null,
			  address: null
		  },
		  months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
		  years: new Date(Date.now()).getFullYear(),
		  man: true,
		  woman: false
	  }
  },
  methods: {
	  checkForm: function (event) {
		this.errors = [];
		if (!this.user.firstName)
			this.errors.push('Le prénom est requis.');
		if (!this.user.lastName)
			this.errors.push('Le nom de famille est requis.');
		if (!this.user.email)
			this.errors.push("L'email est requis.");
		if (this.user.email && !this.user.email.match(/\S+@\S+\.\S{2,}/))
			this.errors.push('Veuillez entrer une adresse mail valide.');
		if (!this.user.password)
			this.errors.push('Le mot de passe est requis.');
		if (this.user.password && !this.user.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/))
			this.errors.push('Le mot de passe doit contenir au moins 6 caractères avec au moins 1 lettre et 1 chiffre.');
		if (this.user.birthday.length !== 3)
			this.errors.push('La date de naisance est requise.');
		else
			this.user.age = new Date(Date.now()).getFullYear() - parseInt(this.user.birthday[2], 10);
		if (!this.user.kind)
			this.errors.push('Votre sexe est requis.');
		if (!this.user.orientation)
			this.errors.push('Votre orientation sexuelle est requise.');
		if (!this.user.address)
			this.errors.push('Votre adresse est requise.');
		console.log('kind', this.user.kind);
		event.preventDefault();
		if (this.errors.length === 0) {
			this.$http.post('http://localhost:3100/api/signup', this.user).then((resp) => {
				console.log('resp', resp);
			}).catch((err) => {
				console.log('err', err)
				this.errors.push(err.body);
			});
		};
	  },
	  /**
	  * When the location found
	  * @param {Object} addressData Data of the found location
	  * @param {Object} placeResultData PlaceResult object
	  * @param {String} id Input container ID
	  */
	  getAddressData: function (addressData, placeResultData, id) {
		  this.user.address = addressData;
		  console.log(addressData);
	  },

	  checker: function (firstId, secondId) {
		  if (document.getElementById(firstId).checked) {
			  document.getElementById(secondId).checked = false;
			  this.user.kind = firstId === 'male' ? 'homme' : 'femme';
		  }
	  }
  },
}
</script>

<style scoped>

</style>
