from datetime import datetime, date

# Test the calendar logic
print("Today's date:", datetime.now().strftime("%Y-%m-%d"))
print("Current date from context: November 6, 2025")

# Test December 2025 events
test_date = "2025-12-02"
print(f"\nTesting event date: {test_date}")

# Simulate JavaScript date parsing
year, month, day = test_date.split('-')
year, month, day = int(year), int(month), int(day)
print(f"Parsed components: year={year}, month={month}, day={day}")

# Check what day of week December 2, 2025 is
test_datetime = datetime(year, month, day)
print(f"December 2, 2025 is a {test_datetime.strftime('%A')}")

# Check first day of December 2025
first_day = datetime(2025, 12, 1)
print(f"December 1, 2025 is a {first_day.strftime('%A')}")
print(f"First day of month index (0=Sunday): {first_day.weekday()}")  # Monday=0 in weekday()
print(f"First day of month index (0=Sunday, JS style): {first_day.weekday() + 1 if first_day.weekday() != 6 else 0}")

# Actually, let's use the correct method
print(f"First day of month index (0=Sunday, correct): {(first_day.weekday() + 1) % 7}")
