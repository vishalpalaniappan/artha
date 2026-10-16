def terminal_input(msg):
    try:
        _input = input(msg)
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