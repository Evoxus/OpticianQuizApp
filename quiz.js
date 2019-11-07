// QUIZ OBJECT

const QUIZ = {
  title: 'Are you an Optical Yoda?',
  questions: [
      { 
          text: 'Hyperopia is when…',
          answers: [
            'The focal point of light entering the eye is behind the retina.',
            'The focal point of light entering the eye is before the retina.',
            'The focal point of light entering the eye is inside the retina.',
            'A patient can see hyperspace.',
          ],
          // index of correct answer
          correct: 0,
      },
      {
        text: 'Myopia is when…',
        answers: [
          'The focal point of light entering the eye is behind the retina.',
          'A patient is blind.',
          'The focal point of light entering the eye is before, or in front of the retina.',
          'There is no focal point.',
        ],
        correct: 2,
      },
      {
        text: 'What is presbyopia?',
        answers: [
          'A dry eye syndrome.',
          'Sudden vision loss.',
          'Tired eyes.',
          'The loss of ability to focus at near starting around age 40.',
        ],
        correct: 3,
      },
      {
        text: 'What is a ptosis crutch?',
        answers: [
          'A bar inserted into the bridge of a patient’s glasses for repair.',
          'A bar placed on a patient’s eyewear to hold up a droopy eyelid.',
          'A walking aid.',
          'A tool used to hold the eye open during surgery.',
        ],
        correct: 1,
      },
      {
        text: 'A lensometer is used for what?',
        answers: [
          'To grind the correct curvature into a lens.',
          'To check how much UV a lens blocks.',
          'To check the curvature of a lens.',
          'Measurement, verification, and layout of lenses.',
        ],
        correct: 3,
      },
      {
        text: 'How much prism is induced if a -10.00 SPH lens is decentered 10 mm?',
        answers: [
          '10 diopters.',
          '1 diopter.',
          '100 diopters.',
          '5 diopters.',
        ],
        correct: 0,
      },
      {
        text: 'What is a lenticular lens design used for?',
        answers: [
          'Reduce thickness in high + Rx.',
          'Correct chromatic aberration.',
          'As a paperweight.',
          'To help presbyopic patients see near.',
        ],
        correct: 0,
      },
      {
        text: 'What is a digitally surfaced lens?',
        answers: [
          'A lens produced by gluing 1’s and 0’s together.',
          'A type of lamination allowing for more accurate lenses.',
          'A lens ground using a much more accurate surfacing machine allowing for greater control of lens design.',
          'An optically inferior material.',
        ],
        correct: 2,
      },
      {
        text: 'What is Z87.1?',
        answers: [
          'A cool frame name.',
          'A safety/protection standard for eyewear set by ANSI.',
          'A minimum level of clarity set by ANSI.',
          'Eyewear marking indicating amount of gold used in production.',
        ],
        correct: 1,
      },
      {
        text: 'What is slab off and what is it used for?',
        answers: [
          'A bifocal that extends across the whole bottom of the lens used for patients wanting a larger reading area.',
          'A type of safety lens used for HVAC workers.',
          'Prism ground into the bottom half of a lens to help thin the lens.',
          'Prism ground into the bottom half of a lens to correct for vertical imbalance.',
        ],
        correct: 3,
      },

  ],

}