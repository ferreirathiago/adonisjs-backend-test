'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PatientSchema extends Schema {
  up () {
    this.create('patients', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('nome'),
      table.string('cpf').notNullable,
      table.string('endereco').notNullable,
      table.string('cidade').notNullable,
      table.string('estado').notNullable,
      table.string('fone'),
      table.string('datanascimento').notNullable,
      table.string('genero'),
      table.string('estadocivil')
      table.string('cep').notNullable,

      table.timestamps()
    })
  }

  down () {
    this.drop('patients')
  }
}

module.exports = PatientSchema
