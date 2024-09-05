"""
import tkinter as tk
from tkinter import messagebox
import numpy as np
from scipy.optimize import linear_sum_assignment
import time
import sqlite

# Function to generate a random cost matrix
def generate_cost_matrix(n):
    return np.random.randint(20, 201, size=(n, n))

# Function to apply the Hungarian algorithm
def hungarian_algorithm(cost_matrix):
    row_ind, col_ind = linear_sum_assignment(cost_matrix)
    optimal_cost = cost_matrix[row_ind, col_ind].sum()
    return row_ind, col_ind, optimal_cost

# Function to save results to the SQLite database
def save_results_to_db(cost_matrix, time_taken):
    cursor.execute('INSERT INTO results (cost_matrix, time_taken) VALUES (?, ?)', (str(cost_matrix.tolist()), time_taken))
    conn.commit()

# Function to calculate minimum cost and display results
def calculate_minimum_cost(entry, window):
    try:
        n = int(entry.get())  # Get the number of tasks/employees from the entry
        if n <= 0:
            raise ValueError("Number of tasks/employees must be positive.")

        # Generate a new random cost matrix for each game round
        cost_matrix = generate_cost_matrix(n)
        start_time = time.perf_counter()  # Start high-resolution timer
        row_ind, col_ind, optimal_cost = hungarian_algorithm(cost_matrix)
        end_time = time.perf_counter()  # End high-resolution timer
        time_taken = end_time - start_time

        # Save results to the database
        save_results_to_db(cost_matrix, time_taken)

        # Display the result in a message box
        result_message = f"Optimal Assignment:\n"
        for i in range(n):
            result_message += f"Employee {row_ind[i] + 1} assigned to Task {col_ind[i] + 1} (Cost: ${cost_matrix[row_ind[i], col_ind[i]]})\n"
        result_message += f"\nMinimum Total Cost: ${optimal_cost}\nTime Taken: {time_taken:.6f} seconds"
        messagebox.showinfo("Result", result_message)

    except ValueError as ve:
        messagebox.showerror("Invalid Input", str(ve))

# Function to create the main UI window
def create_ui():
    # Create the main window
    window = tk.Tk()
    window.title("Minimum Cost Game")

    # Label and entry for number of tasks/employees
    tk.Label(window, text="Enter number of tasks:").grid(row=0, column=0, padx=10, pady=10)
    num_tasks_entry = tk.Entry(window)
    num_tasks_entry.grid(row=0, column=1, padx=10, pady=10)

    # Button to calculate the minimum cost
    calculate_button = tk.Button(window, text="Calculate Minimum Cost", command=lambda: calculate_minimum_cost(num_tasks_entry, window))
    calculate_button.grid(row=1, column=0, columnspan=2, padx=10, pady=10)

    # Start the Tkinter main loop
    window.mainloop()

if __name__ == "__main__":
    # Initialize the SQLite database
    conn = sqlite3.connect('game_results.db')
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS results (
        id INTEGER PRIMARY KEY,
        cost_matrix TEXT,
        time_taken REAL
    )
    ''')

    # Start the Tkinter UI
    create_ui()

    # Close the database connection when the UI is closed
    conn.close()
"""

import tkinter as tk
from tkinter import messagebox, font
import numpy as np
from scipy.optimize import linear_sum_assignment
import time
import sqlite3

# Function to generate a random cost matrix
def generate_cost_matrix(n):
    return np.random.randint(20, 201, size=(n, n))

# Function to apply the Hungarian algorithm
def hungarian_algorithm(cost_matrix):
    row_ind, col_ind = linear_sum_assignment(cost_matrix)
    optimal_cost = cost_matrix[row_ind, col_ind].sum()
    return row_ind, col_ind, optimal_cost

# Function to save results to the SQLite database
def save_results_to_db(cost_matrix, time_taken):
    cursor.execute('INSERT INTO results (cost_matrix, time_taken) VALUES (?, ?)', (str(cost_matrix.tolist()), time_taken))
    conn.commit()

# Function to calculate minimum cost and display results
def calculate_minimum_cost(entry, window):
    try:
        n = int(entry.get())  # Get the number of tasks/employees from the entry
        if n <= 0:
            raise ValueError("Number of tasks/employees must be positive.")

        # Generate a new random cost matrix for each game round
        cost_matrix = generate_cost_matrix(n)
        start_time = time.perf_counter()  # Start high-resolution timer
        row_ind, col_ind, optimal_cost = hungarian_algorithm(cost_matrix)
        end_time = time.perf_counter()  # End high-resolution timer
        time_taken = end_time - start_time

        # Save results to the database
        save_results_to_db(cost_matrix, time_taken)

        # Display the result in a message box
        result_message = f"Optimal Assignment:\n"
        for i in range(n):
            result_message += f"Employee {row_ind[i] + 1} assigned to Task {col_ind[i] + 1} (Cost: ${cost_matrix[row_ind[i], col_ind[i]]})\n"
        result_message += f"\nMinimum Total Cost: ${optimal_cost}\nTime Taken: {time_taken:.6f} seconds"
        messagebox.showinfo("Result", result_message)

    except ValueError as ve:
        messagebox.showerror("Invalid Input", str(ve))


# Function to create the main UI window with enhanced styling
def create_ui():
    # Create the main window
    window = tk.Tk()
    window.title("Minimum Cost Game")
    window.geometry("400x200")
    window.configure(bg="#2E4053")  # Set background color

    # Define custom font
    title_font = font.Font(family="Helvetica", size=14, weight="bold")
    label_font = font.Font(family="Helvetica", size=12)
    button_font = font.Font(family="Helvetica", size=10, weight="bold")

    # Title label
    title_label = tk.Label(window, text="Minimum Cost Game", font=title_font, bg="#2E4053", fg="white")
    title_label.grid(row=0, column=0, columnspan=2, pady=(10, 20))

    # Label and entry for number of tasks/employees
    tk.Label(window, text="Enter number of tasks:", font=label_font, bg="#2E4053", fg="white").grid(row=1, column=0, padx=10, pady=5, sticky="e")
    num_tasks_entry = tk.Entry(window, font=label_font)
    num_tasks_entry.grid(row=1, column=1, padx=10, pady=5)

    # Button to calculate the minimum cost
    calculate_button = tk.Button(
        window, 
        text="Calculate Minimum Cost", 
        font=button_font, 
        bg="#1ABC9C", 
        fg="white", 
        activebackground="#16A085", 
        activeforeground="white", 
        command=lambda: calculate_minimum_cost(num_tasks_entry, window)
    )
    calculate_button.grid(row=2, column=0, columnspan=2, padx=10, pady=20)

    # Start the Tkinter main loop
    window.mainloop()

if __name__ == "__main__":
    # Initialize the SQLite database
    conn = sqlite3.connect('game_results.db')
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS results (
        id INTEGER PRIMARY KEY,
        cost_matrix TEXT,
        time_taken REAL
    )
    ''')

    # Start the Tkinter UI
    create_ui()

    # Close the database connection when the UI is closed
    conn.close()

