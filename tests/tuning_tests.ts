/**
 * VexFlow - Tuning Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */

import { Tuning } from '../src/tuning';
import { QUnit, test, equal, expect } from './declarations';

export default (function () {
  return {
    Start: function () {
      QUnit.module('Tuning');
      test('Standard Tuning', this.standard.bind(this));
      test('Standard Banjo Tuning', this.banjo.bind(this));
      test('Return note for fret', this.noteForFret.bind(this));
    },

    checkStandard: function (tuning: Tuning) {
      try {
        tuning.getValueForString(0);
      } catch (e) {
        equal(e.code, 'BadArguments', 'String 0');
      }

      try {
        tuning.getValueForString(9);
      } catch (e) {
        equal(e.code, 'BadArguments', 'String 7');
      }

      equal(tuning.getValueForString(6), 40, 'Low E string');
      equal(tuning.getValueForString(5), 45, 'A string');
      equal(tuning.getValueForString(4), 50, 'D string');
      equal(tuning.getValueForString(3), 55, 'G string');
      equal(tuning.getValueForString(2), 59, 'B string');
      equal(tuning.getValueForString(1), 64, 'High E string');
    },

    checkStandardBanjo: function (tuning: Tuning) {
      try {
        tuning.getValueForString(0);
      } catch (e) {
        equal(e.code, 'BadArguments', 'String 0');
      }

      try {
        tuning.getValueForString(6);
      } catch (e) {
        equal(e.code, 'BadArguments', 'String 6');
      }

      equal(tuning.getValueForString(5), 67, 'High G string');
      equal(tuning.getValueForString(4), 50, 'D string');
      equal(tuning.getValueForString(3), 55, 'G string');
      equal(tuning.getValueForString(2), 59, 'B string');
      equal(tuning.getValueForString(1), 62, 'High D string');
    },

    banjo: function () {
      expect(7);

      const tuning = new Tuning();
      tuning.setTuning('standardBanjo');
      this.checkStandardBanjo(tuning);
    },

    standard: function () {
      expect(16);

      const tuning = new Tuning();
      this.checkStandard(tuning);

      // Test named tuning
      tuning.setTuning('standard');
      this.checkStandard(tuning);
    },

    noteForFret: function () {
      expect(8);
      const tuning = new Tuning('E/5,B/4,G/4,D/4,A/3,E/3');
      try {
        tuning.getNoteForFret(-1, 1);
      } catch (e) {
        equal(e.code, 'BadArguments', 'Fret -1');
      }

      try {
        tuning.getNoteForFret(1, -1);
      } catch (e) {
        equal(e.code, 'BadArguments', 'String -1');
      }

      equal(tuning.getNoteForFret(0, 1), 'E/5', 'High E string');
      equal(tuning.getNoteForFret(5, 1), 'A/5', 'High E string, fret 5');
      equal(tuning.getNoteForFret(0, 2), 'B/4', 'B string');
      equal(tuning.getNoteForFret(0, 3), 'G/4', 'G string');
      equal(tuning.getNoteForFret(12, 2), 'B/5', 'B string, fret 12');
      equal(tuning.getNoteForFret(0, 6), 'E/3', 'Low E string');
    },
  };
})();
