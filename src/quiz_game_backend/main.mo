import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Text "mo:base/Text";

actor {
  type Quiz = {
    question : Text;
    answer : Text;
  };

  stable var quizzes : [Quiz] = [{
    question = "Apa ibu kota Indonesia?";
    answer = "Jakarta";
  }];
  stable var currentIndex : Nat = 0;

  public query func getCurrentQuiz() : async Text {
    if (currentIndex < quizzes.size()) {
      quizzes[currentIndex].question;
    } else {
      "Tidak ada pertanyaan.";
    };
  };

  public func submit(newQ : Text, newA : Text, userAnswer : Text) : async Bool {
    // Tambahkan pertanyaan & jawaban baru
    let newQuiz : Quiz = { question = newQ; answer = newA };
    quizzes := Array.append(quizzes, [newQuiz]);

    // Periksa jawaban terhadap pertanyaan saat ini
    if (currentIndex < quizzes.size()) {
      let correctAnswer = quizzes[currentIndex].answer;
      let isCorrect = Text.equal(Text.toLowercase(userAnswer), Text.toLowercase(correctAnswer));
      currentIndex += 1;
      return isCorrect;
    };
    return false;
  };
};
