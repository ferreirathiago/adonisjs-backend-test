'use strict'

const Doctor = use('App/Models/Doctors')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with doctors
 */
class DoctorController {
  /**
   * Show a list of all doctors.
   * GET doctors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const doctors = await Doctor.all()

    return doctors
  }


  /**
   * Create/save a new doctor.
   * POST doctors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only([ 'nome', 
    'cpf', 
    'endereco', 
    'cidade',
    'estado',
    'fone',
    'datanascimento',
    'genero',
    'estadocivil',
    'cep',
    'crm',
    'rqe',
    'especialidade',
    'foto'])

const doctor = await Doctor.create({ user_id: auth.user.id, ...data})

return doctor;
  }

  /**
   * Display a single doctor.
   * GET doctors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }



  /**
   * Update doctor details.
   * PUT or PATCH doctors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a doctor with id.
   * DELETE doctors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

        
    //Nao vou deletar usuario por enquanto
    //Nesse caso o usuario so pode deletar ele mesmo. No caso de uma prescricao por exemplo

    const doctor = await Doctor.findOrFail(params.id);

    if (doctor.user_id != auth.user.id){
      return response.status(401)
    }
    await doctor.delete();
  }
}

module.exports = DoctorController
