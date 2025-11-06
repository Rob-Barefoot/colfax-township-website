import calendar
from datetime import datetime, date

# Print December 2025 calendar
print("December 2025 Calendar:")
print("="*30)

# Use Python's calendar module to show the correct layout
cal = calendar.monthcalendar(2025, 12)
days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
print(' '.join(f'{day:>3}' for day in days))
print('-' * 28)

for week in cal:
    week_str = []
    for day in week:
        if day == 0:
            week_str.append('   ')
        else:
            week_str.append(f'{day:>3}')
    print(' '.join(week_str))

print("\nKey dates:")
print("December 1, 2025 (Monday) should be in column 1 (0-indexed)")
print("December 2, 2025 (Tuesday) should be in column 2 (0-indexed)")

# Check JavaScript getDay() behavior for December 1, 2025
first_dec = datetime(2025, 12, 1)
print(f"\nJavaScript .getDay() for Dec 1, 2025: {first_dec.weekday()}")
print(f"But JavaScript uses Sunday=0, so it should be: {(first_dec.weekday() + 1) % 7}")

# Actually test what JavaScript getDay() returns
print("\nPython datetime.weekday() vs JavaScript getDay():")
print("Python: Monday=0, Tuesday=1, ..., Sunday=6")
print("JavaScript: Sunday=0, Monday=1, ..., Saturday=6")
print(f"Dec 1, 2025 is {first_dec.strftime('%A')}")
print(f"Python weekday(): {first_dec.weekday()}")
print(f"JavaScript getDay() equivalent: {(first_dec.weekday() + 1) % 7}")
