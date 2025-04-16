class SM2 {
    public execute(params: Params) {
        if (CardStates.New === params.state) {
            params.state = CardStates.Learning
        }

        if (params.state === CardStates.Learning) {
            if (params.q < QGrade.Good) {
                // Repeat current step
                params.stepIndex = 0
                params.I = learningSteps[0]
            }
            else {
                if (params.q === QGrade.Good) {
                    params.stepIndex += 1

                    if (params.stepIndex < learningSteps.length) {
                        params.I = learningSteps[params.stepIndex];
                    }
                    else {
                        // Graduated to review
                        params.state = CardStates.Reviewing;
                        params.n = 1;
                        params.I = 1;
                    }
                }
                else {
                    if (params.stepIndex === 0) {
                        params.state = CardStates.Reviewing;
                        params.n = 1;
                        params.I = 1; // 1 day
                    }
                    else {
                        params.state = CardStates.Reviewing;
                        params.n = 2;
                        params.I = reviewingSteps[0];
                    }
                }
            }
        }

        else if (params.state === CardStates.Reviewing) {
            if (params.q === QGrade.Again) {
                params.state = CardStates.Relearning
                params.n = 0
                params.EF -= 0.2;
                params.stepIndex = 1
                params.I = relearningSteps[params.stepIndex];
            }
        }
    }
}

interface Params {
    state: CardStates
    q: QGrade
    stepIndex: number
    n: number
    I: number
    EF: number
}

enum CardStates {
    New = 1,
    Learning = 2,
    Reviewing = 3,
    Relearning = 4
}

const learningSteps = [
    1 / 1440,
    10 / 1440
]

const relearningSteps = [
    1 / 1440,
    6 / 1440
]

const reviewingSteps = [
    2,
    3,
    5
]

enum QGrade {
    Again = 1,
    Hard = 2,
    Good = 3,
    Easy = 4
}