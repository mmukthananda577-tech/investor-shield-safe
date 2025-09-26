import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, Trophy, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { lessons, quizzes, Quiz } from "@/data/mock-data";

export default function Learn() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'lessons' | 'quiz'>('lessons');
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuiz) return;
    
    setShowResult(true);
    
    if (selectedAnswer === currentQuiz.correctAnswer) {
      setScore(prev => prev + currentQuiz.points);
      if (!completedQuizzes.includes(currentQuiz.id)) {
        setCompletedQuizzes(prev => [...prev, currentQuiz.id]);
      }
    }
  };

  const handleNextQuiz = () => {
    const currentIndex = quizzes.findIndex(q => q.id === currentQuiz?.id);
    const nextQuiz = quizzes[currentIndex + 1];
    
    if (nextQuiz) {
      setCurrentQuiz(nextQuiz);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCurrentQuiz(null);
      setSelectedAnswer(null);  
      setShowResult(false);
    }
  };

  const progress = Math.round((completedQuizzes.length / quizzes.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        title="Learn & Play" 
        onBack={() => navigate('/')} 
        showBack 
      />

      <div className="p-6 space-y-6">
        {/* Progress & Score */}
        <div className="bg-gradient-hero p-4 rounded-lg text-white">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-xl font-bold">Your Progress</h2>
              <p className="text-sm opacity-90">Keep learning to stay safe!</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{score}</div>
              <div className="text-sm opacity-90">Points</div>
            </div>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />
          <div className="text-sm mt-2">{completedQuizzes.length}/{quizzes.length} quizzes completed</div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-muted rounded-lg p-1">
          <Button
            variant={activeTab === 'lessons' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('lessons')}
            className="flex-1"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Lessons
          </Button>
          <Button
            variant={activeTab === 'quiz' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('quiz')}
            className="flex-1"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Quiz
          </Button>
        </div>

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Investment Safety Lessons</h3>
            {lessons.map((lesson, index) => (
              <Card key={lesson.id} className="p-4 hover:shadow-md transition-shadow animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{lesson.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {lesson.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{lesson.content}</p>
                    <Button size="sm" className="bg-success hover:bg-success/90">
                      <Play className="h-3 w-3 mr-1" />
                      Start Lesson
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="space-y-4">
            {!currentQuiz ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Test Your Knowledge</h3>
                {quizzes.map((quiz, index) => (
                  <Card 
                    key={quiz.id} 
                    className={`p-4 hover:shadow-md transition-shadow animate-fade-in ${
                      completedQuizzes.includes(quiz.id) ? 'bg-success/5 border-success/20' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {completedQuizzes.includes(quiz.id) ? (
                          <CheckCircle className="h-6 w-6 text-success" />
                        ) : (
                          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-foreground">Quiz {index + 1}</h4>
                          <p className="text-sm text-muted-foreground">{quiz.points} points</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => setCurrentQuiz(quiz)}
                        size="sm"
                        variant={completedQuizzes.includes(quiz.id) ? "outline" : "default"}
                        className={!completedQuizzes.includes(quiz.id) ? "bg-success hover:bg-success/90" : ""}
                      >
                        {completedQuizzes.includes(quiz.id) ? 'Retake' : 'Start'}
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {currentQuiz.question}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    {currentQuiz.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full text-left justify-start p-4 h-auto ${
                          selectedAnswer === index 
                            ? showResult
                              ? index === currentQuiz.correctAnswer
                                ? 'bg-success/20 border-success text-success-foreground'
                                : 'bg-destructive/20 border-destructive text-destructive-foreground'
                              : 'bg-accent border-accent-foreground'
                            : showResult && index === currentQuiz.correctAnswer
                              ? 'bg-success/20 border-success text-success-foreground'
                              : ''
                        }`}
                        disabled={showResult}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 ${
                          selectedAnswer === index 
                            ? showResult
                              ? index === currentQuiz.correctAnswer
                                ? 'border-success bg-success text-success-foreground'
                                : 'border-destructive bg-destructive text-destructive-foreground'
                              : 'border-accent-foreground bg-accent'
                            : showResult && index === currentQuiz.correctAnswer
                              ? 'border-success bg-success text-success-foreground'
                              : 'border-muted-foreground'
                        }`}>
                          {showResult && (selectedAnswer === index || index === currentQuiz.correctAnswer) && (
                            index === currentQuiz.correctAnswer ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : selectedAnswer === index ? (
                              <XCircle className="h-4 w-4" />
                            ) : null
                          )}
                        </div>
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showResult && (
                    <div className={`p-4 rounded-lg mb-4 ${
                      selectedAnswer === currentQuiz.correctAnswer 
                        ? 'bg-success/10 border border-success/20' 
                        : 'bg-destructive/10 border border-destructive/20'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {selectedAnswer === currentQuiz.correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                        <span className={`font-semibold ${
                          selectedAnswer === currentQuiz.correctAnswer ? 'text-success' : 'text-destructive'
                        }`}>
                          {selectedAnswer === currentQuiz.correctAnswer ? 'Correct!' : 'Incorrect'}
                        </span>
                        {selectedAnswer === currentQuiz.correctAnswer && (
                          <Badge className="ml-auto bg-success text-success-foreground">
                            +{currentQuiz.points} points
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{currentQuiz.explanation}</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {!showResult ? (
                      <Button
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null}
                        className="flex-1 bg-success hover:bg-success/90"
                      >
                        Submit Answer
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={() => setCurrentQuiz(null)}
                          variant="outline"
                          className="flex-1"
                        >
                          Back to Quizzes
                        </Button>
                        <Button
                          onClick={handleNextQuiz}
                          className="flex-1 bg-secondary hover:bg-secondary/90"
                        >
                          Next Quiz
                        </Button>
                      </>
                    )}
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}