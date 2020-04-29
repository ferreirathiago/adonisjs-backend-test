'use strict'

const Patient = use('App/Models/Patient');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with patients
 */
class PatientController {
  /**
   * Show a list of all patients.
   * GET patients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const patients = await Patient.query()
      .with('user')
      .fetch();
    
    //const patients = await Patient.all();


    return patients
  
  }



  /**
   * Create/save a new patient.
   * POST patients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    const data = request.only([ 'nome', 
                                'cpf', 
                                'endereco', 
                                'cidade',
                                'estado',
                                'fone',
                                'datanascimento',
                                'genero',
                                'estadocivil',
                                'cep'])

    const patient = await Patient.create({ user_id: auth.user.id, ...data})

    return patient;
  }

  /**
   * Display a single patient.
   * GET patients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const patient = await Patient.findOrFail(params.id);

    return patient;

  }

  /**
   * Update patient details.
   * PUT or PATCH patients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a patient with id.
   * DELETE patients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth}) {
    
    //Nao vou deletar usuario por enquanto
    //Nesse caso o usuario so pode deletar ele mesmo. No caso de uma prescricao por exemplo

    const patient = await Patient.findOrFail(params.id);

    if (patient.user_id != auth.user.id){
      return response.status(401)
    }
    await patient.delete();

  }
}

module.exports = PatientController
