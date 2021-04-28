from flask import abort


def disable_route_on_flag(expected_flag_value, actual_flag_value):
    def real_wrapper(func):
        def default():
            abort(404)

        def wrapper(*args, **kwargs):
            if actual_flag_value == expected_flag_value:
                print("got into if")
                return default()
            return func(*args, **kwargs)

        return wrapper

    return real_wrapper
