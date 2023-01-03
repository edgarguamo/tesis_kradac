const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const saltRounds = 10;

const validateEmail = function(email) {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
	return re.test(email);
}

var UsuarioSchema = new Schema({
	idUsuario: {
		type: Number,
		unique: true
	},
	first_name: { 
		type: String,
		trim: true,
		default: null 
	},
  	last_name: { 
		type: String,
		trim: true,
		default: null 
	},
	email:{
		type: String,
		trim: true,
		required: true,
		lowercase: true,
		unique: true,
		validate: [validateEmail, 'Por favor, ingrese un email valido'],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/]
	},
	password: {
		type: String,
		required: [true, 'El password es obligatorio']
    },
	rol: {
		type: String,
		enum: ['Empleado','Administrador'],
		required: [true, 'El rol es obligatorio']
	}
});

UsuarioSchema.pre('save', function(next) {
	// Si la contraseña se modificó
	if( this.isModified('password') ) {
		this.password = bcrypt.hashSync(this.password, saltRounds);
	}
	next();
});

UsuarioSchema.statics.getAll = function(cb) {
	this.find({}, cb);
}

UsuarioSchema.statics.findByIdUsuario = function(idUsuario, cb) {
	this.findOne({idUsuario: idUsuario}, cb);
}

UsuarioSchema.statics.findByIdUsuarioAndRemove = function(idUsuario, cb) {
	this.findOneAndDelete({idUsuario: idUsuario}, cb);
}

UsuarioSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

UsuarioSchema.methods.isSamePassword = function(password) {
	return this.validPassword(password);
}

UsuarioSchema.plugin(AutoIncrement, {inc_field: 'idUsuario'});

module.exports = mongoose.model('Usuario', UsuarioSchema);