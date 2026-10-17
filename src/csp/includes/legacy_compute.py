def terminal_input():
    try:
        _input = input("")
        return {
            "error": False,
            "value": _input
        }
    except KeyboardInterrupt:
        return {
            "error": True,
            "type": "KeyboardInterrupt"
        }
    except EOFError:
        return {
            "error": True,
            "type": "EOFError"
        }