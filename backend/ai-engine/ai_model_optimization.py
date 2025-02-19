from keras.optimizers import Adam
from ai_training import AILearning

ai_trainer = AILearning(learning_rate=0.0005, batch_size=64, epochs=20)
ai_trainer.train_model()
