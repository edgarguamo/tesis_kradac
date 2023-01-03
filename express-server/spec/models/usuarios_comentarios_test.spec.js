const mongoose = require('mongoose');
var UsuariosComentarios = require('../../models/usuarios_comentarios.model');

describe("Testing Usuarios_Comentarios Model", function(){
    beforeAll(function(done) {
		mongoose.disconnect((err) => {
			if (err) console.log(err);
			var mongoDB = 'mongodb://localhost/dataserver-test';
			mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
			const db = mongoose.connection;
			db.on('error', console.error.bind(console, 'MongoDB Test connection error'));
			db.once('open', function() {
				console.log("We are connected to test database!");
				done();
			});
		});
	});

	beforeEach(function(done) {
		var obj = new UsuariosComentarios({
			IdRegistro: 0, IdUsuarioAtendio: 150, FechaHoraRegistro: "2021-01-01 00:00:47",
			Fecha: "2021-01-01", Hora: "00:00:47", CalificacionClientes: 2, CalificacionChoferes: 6,
			ComentarioCliente: "señor conductor llegó acompañante cumplió servicio",
			ComentarioConductor: "usuarios etílico cinco",
			ValoracionCliente: 1, ValoracionConductor: 2
		});
		obj.save(function (err) {
			if (err) return handleError(err);
			// saved!
			done();
		})
	});

	afterEach(function(done) {
		UsuariosComentarios.deleteMany({}, function(err, sucess) {
			if (err) console.log(err);
			done();
		});
	});

    describe("Usuarios_Comentarios.getAll", () => {
		it('comienza vacio', (done) => {
			UsuariosComentarios.getAll(function(err, lista) {
				if (err) console.error(err);
				expect(lista.length).toBe(1);
				done();
			});
		});
	});

	describe("Usuarios_Comentarios.add", () => {
		it('agrego solo un dato', (done) => {
			var hoy = new Date();
			var obj = new UsuariosComentarios({
				IdRegistro: 1, IdUsuarioAtendio: 203, FechaHoraRegistro: "2021-01-01 00:01:38",
				Fecha: "2021-01-01", Hora: "00:01:38", CalificacionClientes: 0, CalificacionChoferes: 9,
				ComentarioCliente: null, ComentarioConductor: "sale cliente",
				ValoracionCliente: 0, ValoracionConductor: 1
			});
			UsuariosComentarios.add(obj, function(err, new_obj) {
				if (err) console.error(err);
				UsuariosComentarios.getAll(function(err, lista) {
					if (err) return console.error(err);
					expect(lista.length).toBe(2);
					expect(lista[1].IdRegistro).toBe(obj.IdRegistro);
					done();
				});
			});
		});
	});

	describe("Usuarios_Comentarios.findByIdRegistro", () => {
		it('debe devolver el item con idRegistro 0', (done) => {
			UsuariosComentarios.getAll(function(err, lista) {
				if (err) console.error(err);
				expect(lista.length).toBe(1);

				var objItem = new UsuariosComentarios({
					IdRegistro: 2, IdUsuarioAtendio: 147, FechaHoraRegistro: "2021-01-01 00:11:43",
					Fecha: "2021-01-01", Hora: "00:11:43", CalificacionClientes: 50, CalificacionChoferes: 50,
					ComentarioCliente: "hhug", ComentarioConductor: "zjjfjfngñkmbzlh",
					ValoracionCliente: 0, ValoracionConductor: 0
				});

				UsuariosComentarios.add(objItem, function(err, nBici) {
					if (err) console.error(err);
					UsuariosComentarios.findByIdRegistro(2, function(err, targetItem) {
						if (err) return console.error(err);
						expect(targetItem.IdRegistro).toBe(objItem.IdRegistro);
						expect(targetItem.IdUsuarioAtendio).toBe(objItem.IdUsuarioAtendio);
						expect(targetItem.FechaHoraRegistro).toBe(objItem.FechaHoraRegistro);
						done();
					});
				});
			});
		});
	});
});