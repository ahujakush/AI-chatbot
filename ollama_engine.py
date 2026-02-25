import ollama

def get_answer(question):
    try:
        response = ollama.chat(
            model='phi3',
            messages=[
                {
                    "role": "system",
                    "content": "You are an AI assistant for SGT University. Answer questions about admissions, courses, fees, campus, and placements."
                },
                {
                    "role": "user",
                    "content": question
                }
            ]
        )

        return response['message']['content']

    except Exception as e:
        return "Error: " + str(e)