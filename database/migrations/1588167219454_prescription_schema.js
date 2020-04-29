'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PrescriptionSchema extends Schema {
  up () {
    this.create('prescriptions', (table) => {
      table.increments()
      table
        .integer('patient_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')

        table
        .integer('doctor_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        table.string('sessionDate')
        table.text('sessionTime')
        table.string('sessionId')
        table.text('prescription')
        table.text('anamnese')
        
      table.timestamps()
    })
  }

  down () {
    this.drop('prescriptions')
  }
}

module.exports = PrescriptionSchema
