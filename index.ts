class SM2 {
    public execute() {

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
    1/1440,
    10/1440
]

const relearningSteps = [
    1/1440,
    6/1440
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