export class Questions {
    constructor(
        public questionText: string = "",
        public questionType: 'MCQ' | 'True/False' | 'Descriptive',
        public option?: String[],
        public marks: number = 0,
        public correctAnswer: String = "",
        public questionPaperId: string = ""
    ) {

    }
}

