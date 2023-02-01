%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin

@contract_interface
namespace HasWards {
    func deny(user: felt) {
    }
}

@contract_interface
namespace TeleportGateway {
    func file(what: felt, domain: felt, data: felt) {
    }
}

@external
func execute{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    const dai = 0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3;
    const bridge = 0x075ac198e734e289a6892baa8dd14b21095f13bf8401900f5349d5569c3f6e60;
    const bridge_legacy = 0x001108cdbe5d82737b9057590adaf97d34e74b5452f0628161d237746b6fe69e;
    const teleport_gateway = 0x05b20d8c7b85456c07bdb8eaaeab52a6bf3770a586af6da8d3f5071ef0dcf234;
    const gov_relay_legacy = 0x01bd845968fc0866ecb43076fc8f122ce6f1793d5871129ee3bae056ca81b672;

    // deny legacy gov relay
    HasWards.deny(dai, gov_relay_legacy);
    HasWards.deny(bridge, gov_relay_legacy);
    HasWards.deny(bridge_legacy, gov_relay_legacy);
    HasWards.deny(teleport_gateway, gov_relay_legacy);

    // deny legacy bridge
    HasWards.deny(dai, bridge_legacy);

    // remove ETH-MAIN-A from valid domains
    TeleportGateway.file(teleport_gateway, 'valid_domains', 'ETH-MAIN-A', 0);

    return ();
}
