var mongoose = require('mongoose');
var UsuariosComentarios = require('../../../models/usuarios_comentarios.model');
var request = require('request');
var server = require('../../../bin/www');

var base_url = 'http://localhost:3000/api/public/usuarios_comentarios';

describe("Usuarios_Comentarios API", function(){
	beforeAll(function(done) {
		mongoose.disconnect((err) => {
			if (err) console.log(err);
			var mongoDB = process.env.MONGO_URI;
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

	describe("GET USUARIOS_COMENTARIOS", function(){
		it('Status 200', (done) => {
			request.get(base_url, function(error, response, body) {
				var result = JSON.parse(body);
				expect(response.statusCode).toBe(200);
				expect(result.length).toBe(1);
				done();
			});
		});
	});

	describe("GET USUARIOS_COMENTARIOS /:id", function(){
		it('Status 200 con IdRegistro 1', (done) => {
			UsuariosComentarios.getAll(function(err, lista) {
				if (err) console.error(err);
				expect(lista.length).toBe(1);

				var objItem = new UsuariosComentarios({
                    IdRegistro: 1, IdUsuarioAtendio: 203, FechaHoraRegistro: "2021-01-01 00:01:38",
                    Fecha: "2021-01-01", Hora: "00:01:38", CalificacionClientes: 0, CalificacionChoferes: 9,
                    ComentarioCliente: null, ComentarioConductor: "sale cliente",
                    ValoracionCliente: 0, ValoracionConductor: 1
                });

				UsuariosComentarios.add(objItem, function(err, new_obj) {
					if (err) console.error(err);
					request.get(base_url + "/1", function(error, response, body){
						expect(response.statusCode).toBe(200);
						var item = JSON.parse(body);
                        console.log(body);
                        console.log(item);
						expect(item.IdRegistro).toBe(objItem.IdRegistro);
						expect(item.IdUsuarioAtendio).toBe(objItem.IdUsuarioAtendio);
						expect(item.FechaHoraRegistro).toBe(objItem.FechaHoraRegistro);
						done();
					});
				});
			});
		});
	});
});